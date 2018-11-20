#!/bin/bash
sam package \
    --template-file template.yaml \
    --output-template-file serverless-output.yaml \
    --s3-bucket $BUCKET_NAME

sam deploy \
    --template-file serverless-output.yaml \
    --stack-name catfacts \
    --capabilities CAPABILITY_IAM

