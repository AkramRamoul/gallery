import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

const mockPosts = [
  "https://utfs.io/f/9IXYuTxot9BzGBevudDrvURZynd6TE3MAYSCxIwj4Ltc1gzu",
  "https://utfs.io/f/9IXYuTxot9BzoFTLgki8qKJYUtrPigmnL0IW7ufdTpzFRwVe",
  "https://utfs.io/f/9IXYuTxot9Bz9pEEZ0xot9Bz3inURNF2aV4hJc5vXQeImPH0",
  "https://utfs.io/f/9IXYuTxot9BziUITdn3sa1Dzoj2Ex6GICUQSyNAgrXW9Zunf",
  "https://utfs.io/f/9IXYuTxot9BzV2Pkln9YKUJ7V9f6wz8CctBoE4A2XPSxOFlv",
];
const mockImage = mockPosts.map((url, index) => ({
  id: index + 1,
  url,
}));
export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48">
            <p>{post.name}</p>
          </div>
        ))}
        {mockImage.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
