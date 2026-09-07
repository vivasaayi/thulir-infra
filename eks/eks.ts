import { Construct } from 'constructs';

import {
    EksCluster,
} from "@cdktf/provider-aws";

import {
    EksIamRole
} from "./iam";

import { AwsClient } from '../aws/aws_client';

export class Eks {
    scope: Construct;
    id: string;
    clusterName: string;
    eksIamRole: EksIamRole;
    awsClient: AwsClient;

    constructor(scope: Construct, id: string, awsClient:AwsClient) {
        this.scope = scope;
        this.id = id;
        this.clusterName = "test-cluster";
        this.awsClient = awsClient;

        this.eksIamRole = new EksIamRole(
            this.scope,
            "eksiam",
            "test-eks-iam-role");

        new EksCluster(this.scope, id, {
            name: this.clusterName,
            roleArn: this.eksIamRole.role.arn,
            vpcConfig: [
                {
                    endpointPrivateAccess: true,
                    subnetIds: this.filterSubnets()
                }
            ]
        })
    }

    filterSubnets() {
        const ids = this.awsClient.subnetIds();

        return ids.slice(0, 2);
    }
}