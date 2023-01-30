import {Client} from 'minio'
import { Injectable, Inject } from "@nestjs/common";
import constants from "./constants";
import { Logger } from "../logger/Logger";

@Injectable()
class S3Helper {
    constructor(
        private logger: Logger,
        @Inject(constants.PROVIDER_S3) private s3: Client
    ) {}

    putObject(key: string, buffer: Buffer) {    
        try {
            var metaData = {
                'Content-Type': 'image/jpg',
            }
        
            this.s3.putObject(process.env.S3_PUBLIC_BUCKET, key, buffer, buffer.length, metaData , (e) => {
                if (e) return this.logger.error("[S3, Put Object Error]", e);

                this.logger.log(`[S3, Put Object Success] key: ${key}`, {key: key})
            });
            return `${process.env.S3_RESULT_ENDPOINT_URL}/${process.env.S3_PUBLIC_BUCKET}/${key}`;
        } catch (e) {
            this.logger.error("[S3, Put Object Error]", e);
            throw e;
        }
    }
}

export default S3Helper;
