import IBlobReader from ".";

export default class HTTPBlobReader implements IBlobReader {
    read = (uri: string): Promise<Blob> => {
        return fetch(uri).then(r => r.blob());
    };

}