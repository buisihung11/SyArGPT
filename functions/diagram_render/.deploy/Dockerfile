FROM public.ecr.aws/lambda/python:3.9
RUN yum install -y graphviz

# Copy function code
COPY ./functions/diagram_render ./functions/diagram_render
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Install the function's dependencies using file
RUN pip install -r requirements.txt

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "functions/diagram_render/lambda_handler.lambda_handler" ]
