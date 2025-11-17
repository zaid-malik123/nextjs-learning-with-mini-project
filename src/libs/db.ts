import { connect } from "mongoose"

const databaseUrl = process.env.MONGO_URI
if(!databaseUrl){
     throw new Error("data base url is not found")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

export const connectDb = async ()=>{
  if(cached.conn){
    return cached.conn
  }
  if(!cached.promise){
    cached.promise = connect(databaseUrl).then((c)=> c.connection)
  }
  try {
    cached.conn = await cached.promise
  } catch (error) {
    throw new Error("connection failed")
  }
  return cached.conn
}

