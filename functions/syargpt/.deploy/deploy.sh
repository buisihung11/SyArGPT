#!bin/bash

stage=$1

# remove old files
rm serverless.yml
rm requirements.txt

# copy new files
cp -r functions/syargpt/.deploy/* .

# Set AWS credentials
# serverless config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY

# deploy
# if not found $stage, deploy without stage
if [ -z $stage ]; then
    serverless deploy
else
    serverless deploy --stage $stage
fi