export default class extends Error {
    status = 418

    constructor(public message: string) {
        super(message)
    }

    toResponse() {
        // console.log(this.message);
        return Response.json({
            error: this.message,
            code: this.status
        }, {
            status: 418
        })
    }
}