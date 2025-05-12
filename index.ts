import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

}

main()
    .then(async () => {
        await prisma.url.deleteMany()
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
    })