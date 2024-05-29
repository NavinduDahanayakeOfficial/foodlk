import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
    connect(process.env.MONGO_URI!).then(
        () => console.log("Connected to the database"),
        (error) => console.error("Could not connect to the database", error)
    )
}