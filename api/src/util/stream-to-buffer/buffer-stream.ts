import { Writable, WritableOptions } from 'stream';

export interface Bufferable {
    toBuffer(): Buffer;
}

export class BufferableStream extends Writable implements Bufferable {
    private readonly chunks: any[];

    constructor(opts?: WritableOptions) {
        super(opts);
        this.chunks = [];
    }

    toBuffer(): Buffer {
        return this.chunksToBuffer();
    }

    _write(chunk: any, _: string, next: (error?: Error | null) => void): void {
        this.chunks.push(chunk);
        next();
    }

    private chunksToBuffer(): Buffer {
        return Buffer.concat(this.chunks);
    }
}
