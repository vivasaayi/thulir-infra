import { Construct } from 'constructs';

import {
    IamRole, IamRolePolicyAttachment
} from "@cdktf/provider-aws";

export class EksIamRole {
    scope: Construct;
    id: string;
    roleName: string;
    role: IamRole;

    constructor(scope: Construct, id: string, roleName: string) {
        this.scope = scope;
        this.id = id;
        this.roleName = roleName;

        this.role = new IamRole(this.scope, this.id, {
            assumeRolePolicy: JSON.stringify(this.getAssumeRolePolicy())
        })

        new IamRolePolicyAttachment(this.scope, "eks-policy-attach", {
            role: this.role.name,
            policyArn: "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
        })
    }

    getAssumeRolePolicy() {
        return {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "eks.amazonaws.com"
                    },
                    "Action": "sts:AssumeRole"
                }
            ]
        }
    }
}

export class Ec2InstanceIamRole {
    scope: Construct;
    id: string;
    roleName: string;
    role: IamRole;

    constructor(scope: Construct, id: string, roleName: string) {
        this.scope = scope;
        this.id = id;
        this.roleName = roleName;

        this.role = new IamRole(this.scope, this.id, {
            assumeRolePolicy: JSON.stringify(this.getAssumeRolePolicy())
        })

        new IamRolePolicyAttachment(this.scope, "ec2-policy", {
            role: this.role.name,
            policyArn: "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
        })

        new IamRolePolicyAttachment(this.scope, "cni-policy", {
            role: this.role.name,
            policyArn: "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
        })
    }

    getAssumeRolePolicy() {
        return {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "ec2.amazonaws.com"
                    },
                    "Action": "sts:AssumeRole"
                }
            ]
        }
    }
}
