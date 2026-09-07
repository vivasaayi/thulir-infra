import { DataAwsSubnets, DataAwsVpc } from '@cdktf/provider-aws'
import { Construct } from 'constructs';


export class Data {
    vpcData: DataAwsVpc;
    subnetData: DataAwsSubnets;

    constructor(scope: Construct) {
        this.vpcData = new DataAwsVpc(scope, "vpcdata");
        this.subnetData = new DataAwsSubnets(scope, "subnetData");

        console.log(this.subnetData.count);
    }
}