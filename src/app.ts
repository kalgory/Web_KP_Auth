import * as express from 'express';

const app: express.Application = express();

// get
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello express');
});

// 3010 포트로 서버 실행
app.listen(3010, () => {
  console.log('실행중');
});
