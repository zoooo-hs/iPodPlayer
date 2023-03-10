import { IBlobReader } from ".";

export default class HTTPBlobReader implements IBlobReader {
    read = (uri: string): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch(uri).then(r => r.blob()).then(resolve)
            }, 2000);
        });
    };

}