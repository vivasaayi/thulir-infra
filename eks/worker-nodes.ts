import {
    Instance,
    IamInstanceProfile
} from "@cdktf/provider-aws";
import { Construct } from "constructs";

import {
    Ec2InstanceIamRole
} from "./iam";

export class WorkerNodes {
    amiId: string;
    instances: Instance[];

    constructor(scope: Construct, id: string) {
        this.amiId = "ami-0800826177b25080e"

        this.instances = [];

        const ec2InstanceIamRole = new Ec2InstanceIamRole(
            scope,
            "ec2-instance-iam",
            "ec2-instance-iam");

        const iamProfile = new IamInstanceProfile(
            scope,
            "ec2-iam-profile",
            {
                name: "ec2-eks-wn-iam-profile",
                role: ec2InstanceIamRole.roleName
            }
        );

        this.instances.push(new Instance(scope, id + "1", {
            ami: this.amiId,
            instanceType: "t3.micro",
            iamInstanceProfile: iamProfile.arn
        }));
    }
}