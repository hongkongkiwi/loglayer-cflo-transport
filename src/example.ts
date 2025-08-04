import { LogLayer } from 'loglayer';
import { CfloTransport } from './index';

declare const createLogger: any;

const cfloLogger = createLogger({
  level: 'info',
  format: 'json'
});

const log = new LogLayer({
  transport: new CfloTransport({
    logger: cfloLogger,
    includeMetadata: true
  })
});

log.withContext({ service: 'auth' })
   .withMetadata({ requestId: 'req-123', userId: '456' })
   .info('User authentication successful');

log.withError(new Error('Database connection failed'))
   .error('Failed to connect to database');

log.debug('Debug information', { debugData: 'test' });
log.warn('Warning message');
log.error('Error occurred');