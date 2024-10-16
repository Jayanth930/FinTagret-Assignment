import { createClient } from "redis";

async function main() {
    const client = new createClient()
    await client.connect()

    await client.set("degree","btech");

    const name = await client.get("name");
    console.log(name)

    client.disconnect()
}


main()