import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import {
  AwsProvider,
  KinesisStream,
  KinesisFirehoseDeliveryStream
} from "@cdktf/provider-aws";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, "aws", {
      region: "us-east-1",
    });

    new KinesisStream(this, "thulir-iot-data-collector", {
      name: "thulir-iot-data-collector",
      shardCount: 1
    })

    new KinesisFirehoseDeliveryStream(this, "thulir-iot-data-delivery-pipeline", {
      name: "thulir-iot-data-delivery-pipeline",
      destination: "elasticsearch"
    })
  }
}

const app = new App();
new MyStack(app, 'thulir-infra');
app.synth();
