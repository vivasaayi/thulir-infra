import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import {
  AwsProvider,
  KinesisStream,
  KinesisFirehoseDeliveryStream
} from "@cdktf/provider-aws";

import {
  AwsClient
} from "./aws/aws_client"

import {
  Eks
} from "./eks/eks";

class MyStack extends TerraformStack {
  scope: Construct;
  name: string;

  constructor(scope: Construct, name: string) {
    super(scope, name);

    this.scope = scope;
    this.name = name;
  }

  async init() {
    new AwsProvider(this, "aws", {
      region: "us-east-1",
    });

    const awsClient = new AwsClient({
      region: "us-east-1"
    });

    console.log("Fetching AWS Data");
    await awsClient.init()
    console.log("AWS Data Fetched");

    new KinesisStream(this, "thulir-iot-data-collector", {
      name: "thulir-iot-data-collector",
      shardCount: 1
    })

    new KinesisFirehoseDeliveryStream(this, "thulir-iot-data-delivery-pipeline", {
      name: "thulir-iot-data-delivery-pipeline",
      destination: "elasticsearch"
    })

    new Eks(this, "eks", awsClient)
  }
}

const app = new App();
const mystack = new MyStack(app, 'thulir-infra');

mystack.init()
  .then(() => {
    console.log("Synthesizing")
    app.synth();
  });
