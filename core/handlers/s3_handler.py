import boto3

s3 = boto3.client('s3')

class S3Handler():
    def __init__(self, bucket_name):
        self.bucket_name = bucket_name
        
    @staticmethod
    def url_to_s3_key(url):
        """
            Convert url to s3 key.
            :param url: str
                The url.
            :return: str
                The s3 key.
        """
        return url.replace("://", "/").replace("/", "_")    
    
    def is_file_exist(self, file_name):
        try:
            s3.head_object(Bucket=self.bucket_name, Key=file_name)
            return True
        except:
            return False
        
    def get_s3_uri(self, file_name):
        return f"s3://{self.bucket_name}/{file_name}"
        
    def upload_object(self, file_name, file_content):
        s3.put_object(Bucket=self.bucket_name, Key=file_name, Body=file_content)
        print(f"Uploaded file {file_name} to S3 bucket {self.bucket_name}")
        s3_uri = self.get_s3_uri(file_name)
        
        return s3_uri
    
    def is_file_exist_by_regex(self, regex):
        response = s3.list_objects_v2(Bucket=self.bucket_name)
        for obj in response.get('Contents', []):
            if regex in obj['Key']:
                return True
        return False