# Serverless Cat Facts

### About
Send and receive Cat Facts directly to your Phone's SMS or Email using serverless technologies

### Architecture Overview
![architecture](https://i.imgur.com/5GnnpJD.png)


### Prereqs
```
Nodejs 8.x
NPM 
Python 3.6
aws-cli
sam-cli
```
### Installation
Configure your AWS credentials with the AWS CLI
```
$ aws configure
```

Create the S3 Bucket that will store the CloudFormation template
```
$ aws s3 mb s3://bucket-name --region <region-name>
```
Export the S3 bucket name you will deploy the CloudFormation template to
```
$ export BUCKET_NAME=<your_bucket_name>
```
Execute build.sh to deploy to your AWS Environment
```sh
$ ./build.sh
```

### TODOs
- Add tests