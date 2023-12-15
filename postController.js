const db = require('./db');
class PostController {
    async createPost(req, res) {
        const { title, content, person_id } = req.body;
        const newPost = await db.query(
            `INSERT INTO post (title, content, person_id) values ($1, $2, $3) RETURNING *`,
            [title, content, person_id],
        );
        res.json(newPost.rows[0]);
    }
    async getPostByUser(req, res) {
        const id = req.query.id;
        const post = await db.query(`SELECT * FROM post WHERE person_id = $1`, [id])
        res.json(post.rows)
    }
}
module.exports = new PostController();