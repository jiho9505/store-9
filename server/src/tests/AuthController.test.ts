import request from 'supertest';
import { app } from '../../app';
const server = request.agent(app);

describe('api test', () => {
  describe('server status check', () => {
    it('auth check', (done) => {
      server
        .get('/api/auth/check')
        .expect(403)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.ok).toBe(false);
          done();
        });
    });
  });
});
