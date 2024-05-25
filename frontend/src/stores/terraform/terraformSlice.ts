import { z } from "zod"
import { StateCreator } from "zustand"

export const TerraformAISchema = z.object({
  files: z.array(
    z.object({
      name: z.string().describe("name of the file"),
      content: z.string().describe("content of the file")
    })
  )
})

export type TerraformResult = z.infer<typeof TerraformAISchema>

export type TerraformSlice = {
  result: TerraformResult
  isLoading: boolean
  setCode: (code: TerraformResult) => void
  setIsLoading: (isLoading: boolean) => void
  logs: any[]
  setLogs: (logs: any[]) => void
  cleanLogs: () => void
}

const files = [
  {
    name: "main.tf",
    content:
      'provider "aws" {\n  region = var.aws_region\n}\n\nresource "aws_vpc" "vpc" {\n  cidr_block = var.vpc_cidr\n\n  enable_dns_hostnames = true\n  enable_dns_support   = true\n\n  tags = {\n    Name = "${var.env_prefix}-vpc"\n  }\n}\n\nresource "aws_internet_gateway" "igw" {\n  vpc_id = aws_vpc.vpc.id\n\n  tags = {\n    Name = "${var.env_prefix}-igw"\n  }\n}\n\nresource "aws_nat_gateway" "nat_gw" {\n  allocation_id = aws_eip.nat_eip.id\n  subnet_id     = aws_subnet.public_subnet[0].id\n\n  tags = {\n    Name = "${var.env_prefix}-nat-gw"\n  }\n\n  depends_on = [aws_internet_gateway.igw]\n}\n\nresource "aws_eip" "nat_eip" {\n  vpc        = true\n  depends_on = [aws_internet_gateway.igw]\n\n  tags = {\n    Name = "${var.env_prefix}-nat-gw-eip"\n  }\n}\n\nresource "aws_subnet" "public_subnet" {\n  count                   = length(var.public_subnets)\n  vpc_id                  = aws_vpc.vpc.id\n  cidr_block              = var.public_subnets[count.index]\n  availability_zone       = data.aws_availability_zones.available.names[count.index]\n  map_public_ip_on_launch = true\n\n  tags = {\n    Name = "${var.env_prefix}-public-${count.index + 1}"\n  }\n}\n\nresource "aws_subnet" "private_subnet" {\n  count                   = length(var.private_subnets)\n  vpc_id                  = aws_vpc.vpc.id\n  cidr_block              = var.private_subnets[count.index]\n  availability_zone       = data.aws_availability_zones.available.names[count.index]\n  map_public_ip_on_launch = false\n\n  tags = {\n    Name = "${var.env_prefix}-private-${count.index + 1}"\n  }\n}\n\nresource "aws_route_table" "public_rt" {\n  vpc_id = aws_vpc.vpc.id\n\n  route {\n    cidr_block = "0.0.0.0/0"\n    gateway_id = aws_internet_gateway.igw.id\n  }\n\n  tags = {\n    Name = "${var.env_prefix}-public-rt"\n  }\n}\n\nresource "aws_route_table" "private_rt" {\n  vpc_id = aws_vpc.vpc.id\n\n  route {\n    cidr_block     = "0.0.0.0/0"\n    nat_gateway_id = aws_nat_gateway.nat_gw.id\n  }\n\n  tags = {\n    Name = "${var.env_prefix}-private-rt"\n  }\n}\n\nresource "aws_route_table_association" "public_rt_assoc" {\n  count          = length(var.public_subnets)\n  subnet_id      = aws_subnet.public_subnet[count.index].id\n  route_table_id = aws_route_table.public_rt.id\n}\n\nresource "aws_route_table_association" "private_rt_assoc" {\n  count          = length(var.private_subnets)\n  subnet_id      = aws_subnet.private_subnet[count.index].id\n  route_table_id = aws_route_table.private_rt.id\n}\n\nresource "aws_security_group" "web_sg" {\n  name        = "${var.env_prefix}-web-sg"\n  description = "Allow HTTP/HTTPS inbound traffic"\n  vpc_id      = aws_vpc.vpc.id\n\n  ingress {\n    from_port   = 80\n    to_port     = 80\n    protocol    = "tcp"\n    cidr_blocks = ["0.0.0.0/0"]\n  }\n\n  ingress {\n    from_port   = 443  \n    to_port     = 443\n    protocol    = "tcp"\n    cidr_blocks = ["0.0.0.0/0"]\n  }\n\n  egress {\n    from_port       = 0\n    to_port         = 0 \n    protocol        = "-1"\n    cidr_blocks     = ["0.0.0.0/0"]\n  }\n\n  tags = {\n    Name = "${var.env_prefix}-web-sg"\n  }\n}\n\nresource "aws_security_group" "app_sg" {\n  name        = "${var.env_prefix}-app-sg"\n  description = "Allow inbound traffic from web tier"\n  vpc_id      = aws_vpc.vpc.id\n\n  ingress {\n    from_port       = 8080\n    to_port         = 8080\n    protocol        = "tcp"\n    security_groups = [aws_security_group.web_sg.id]\n  }\n\n  egress {\n    from_port       = 0\n    to_port         = 0\n    protocol        = "-1"\n    cidr_blocks     = ["0.0.0.0/0"]\n  }\n\n  tags = {\n    Name = "${var.env_prefix}-app-sg"\n  }\n}\n\nresource "aws_security_group" "db_sg" {\n  name        = "${var.env_prefix}-db-sg"\n  description = "Allow inbound traffic from app tier"\n  vpc_id      = aws_vpc.vpc.id\n\n  ingress {\n    from_port       = 3306\n    to_port         = 3306\n    protocol        = "tcp"\n    security_groups = [aws_security_group.app_sg.id]\n  }\n\n  egress {\n    from_port       = 0\n    to_port         = 0\n    protocol        = "-1"\n    cidr_blocks     = ["0.0.0.0/0"]\n  }\n\n  tags = {\n    Name = "${var.env_prefix}-db-sg"\n  }\n}\n\nresource "aws_instance" "web" {\n  count                  = var.web_instance_count\n  ami                    = var.ami_id\n  instance_type          = var.web_instance_type\n  subnet_id              = aws_subnet.public_subnet[count.index % length(var.public_subnets)].id\n  vpc_security_group_ids = [aws_security_group.web_sg.id]\n  user_data              = file("scripts/web_userdata.sh")\n\n  tags = {\n    Name = "${var.env_prefix}-web-${count.index + 1}"\n  }\n}\n\nresource "aws_instance" "app" {\n  count                  = var.app_instance_count  \n  ami                    = var.ami_id\n  instance_type          = var.app_instance_type\n  subnet_id              = aws_subnet.private_subnet[count.index % length(var.private_subnets)].id\n  vpc_security_group_ids = [aws_security_group.app_sg.id]\n  user_data              = file("scripts/app_userdata.sh")\n\n  tags = {\n    Name = "${var.env_prefix}-app-${count.index + 1}"\n  }\n}\n\nresource "aws_db_subnet_group" "db_subnet_group" {\n  name        = "${var.env_prefix}-db-subnet-group"\n  description = "Subnet group for RDS instance"\n  subnet_ids  = aws_subnet.private_subnet[*].id\n}\n\nresource "aws_db_instance" "db" {\n  identifier             = "${var.env_prefix}-db"\n  allocated_storage      = var.db_storage\n  engine                 = "mysql"\n  engine_version         = "5.7"\n  instance_class         = var.db_instance_class\n  name                   = var.db_name\n  username               = var.db_username\n  password               = var.db_password\n  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.name\n  vpc_security_group_ids = [aws_security_group.db_sg.id]\n  skip_final_snapshot    = true\n}\n\nresource "aws_elb" "web_elb" {\n  name                      = "${var.env_prefix}-web-elb"\n  subnets                   = aws_subnet.public_subnet[*].id\n  security_groups           = [aws_security_group.web_sg.id]\n  cross_zone_load_balancing = true\n  connection_draining       = true\n\n  listener {\n    instance_port     = 80\n    instance_protocol = "http"\n    lb_port           = 80\n    lb_protocol       = "http"\n  }\n\n  health_check {\n    healthy_threshold   = 2\n    unhealthy_threshold = 2\n    timeout             = 3\n    target              = "HTTP:80/"\n    interval            = 30\n  }\n\n  instances = aws_instance.web[*].id\n}\n'
  },
  {
    name: "variables.tf",
    content:
      'variable "aws_region" {\n  description = "AWS region to create resources in"\n  default     = "us-east-1"\n}\n\nvariable "env_prefix" {\n  description = "Prefix to prepend to resource names"\n  default     = "dev"\n}\n\nvariable "vpc_cidr" {\n  description = "CIDR block for VPC"\n  default     = "10.0.0.0/16"\n}\n\nvariable "public_subnets" {\n  description = "CIDR blocks for public subnets"\n  default     = ["10.0.1.0/24", "10.0.2.0/24"]\n}\n\nvariable "private_subnets" {\n  description = "CIDR blocks for private subnets"\n  default     = ["10.0.10.0/24", "10.0.20.0/24"]\n}\n\nvariable "ami_id" {\n  description = "AMI ID for EC2 instances"\n  default     = "ami-0cff7528ff583bf9a" # Amazon Linux 2 AMI\n}\n\nvariable "web_instance_type" {\n  description = "Instance type for web tier"\n  default     = "t2.micro"\n}\n\nvariable "web_instance_count" {\n  description = "Number of web instances"\n  default     = 2\n}\n\nvariable "app_instance_type" {\n  description = "Instance type for app tier"\n  default     = "t2.micro"\n}\n\nvariable "app_instance_count" {\n  description = "Number of app instances"\n  default     = 2\n}\n\nvariable "db_instance_class" {\n  description = "Instance class for RDS"\n  default     = "db.t2.micro"\n}\n\nvariable "db_storage" {\n  description = "Allocated storage for RDS"\n  default     = 20\n}\n\nvariable "db_name" {\n  description = "Name of the database"\n  default     = "mydb"\n}\n\nvariable "db_username" {\n  description = "Username for database"\n  default     = "admin"\n}\n\nvariable "db_password" {\n  description = "Password for database"\n  default     = "mypassword"\n}\n'
  },
  {
    name: "data.tf",
    content:
      'data "aws_availability_zones" "available" {\n  state = "available"\n}\n'
  }
]

export const createTerraformSlice: StateCreator<
  TerraformSlice,
  [],
  [],
  TerraformSlice
> = (set, get) => ({
  result: { files: files },
  isLoading: false,
  setCode: (result: TerraformResult) => {
    set(state => {
      return {
        result
      }
    })
  },
  setIsLoading: (isLoading: boolean) => {
    set(state => ({ isLoading }))
  },
  logs: [],
  setLogs: (logs: any[]) => {
    set(state => ({ logs: [...state.logs, ...logs] }))
  },
  cleanLogs: () => {
    set(state => ({ logs: [] }))
  }
})
