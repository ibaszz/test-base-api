// throttler-behind-proxy.guard.ts
import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    return req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for']
      : req.ips.length
      ? req.ips[0]
      : req.ip; // individualize IP extraction to meet your own needs
  }
}
