import {
    EC2Client,
    DescribeVpcsCommand,
    DescribeSubnetsCommand,
    Vpc,
    Subnet
} from "@aws-sdk/client-ec2";

export class AwsClient {
    ec2Client: EC2Client;
    vpcs?: Vpc[];
    subnets?: Subnet[];

    constructor(config: any) {
        this.ec2Client = new EC2Client(config);
        this.vpcs = []
        this.subnets = [];
    }

    async init() {
        await this.InitVPCs();
        await this.InitSubnets();
    }

    async InitVPCs() {
        const command = new DescribeVpcsCommand({});
        const response = await this.ec2Client.send(command);

        this.vpcs = response.Vpcs;
        console.log(this.vpcs);
    }

    async InitSubnets() {
        const command = new DescribeSubnetsCommand({});
        const response = await this.ec2Client.send(command);

        this.subnets = response.Subnets;
        console.log(this.subnets);
    }

    subnetIds() {
        const subnetIds: string[] = [];

        if (!this.subnets) {
            return subnetIds;
        }

        this.subnets.forEach(subnet => {
            subnetIds.push(subnet.SubnetId || "");
        });

        return subnetIds;
    }
}