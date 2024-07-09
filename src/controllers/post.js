import prisma from "../../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    const { type, location, property, minPrice, maxPrice, bedroom } = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: location,
                type: type,
                property: property,
                bedroom: parseInt(bedroom),
                price: {
                    gte: parseInt(minPrice),
                    lte: parseInt(maxPrice)
                }
            }
        });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getPost=async(req,res)=>{
    try{
        const id=parseInt(req.params.id);


        const post=await prisma.post.findUnique({
                where:{id},
                include:{
                    postDetail:true,
                    user:{
                        select:{
                            username:true,
                            avatar:true
                        }
                    }
                }
        })

        if(!post){
            res.status(404).json({
                message:`Post for given id ${id} not found`,
                status:404
            })
        }


        const token=req.cookies?.token

        if (token) {
            jwt.verify(token, process.env.JWT_SIGN, async (err, payload) => {
                if (!err) {
                    const saved = await prisma.savedPost.findUnique({
                        where: {
                            userId_postId: {
                                postId: id,
                                userId: payload.id,
                            },
                        },
                    });
                    res.status(200).json({ ...post, isSaved: !!saved });
                }
            });
        }

        res.status(200).json(post)

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}
//

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail,
                },
            },
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create post" });
    }
};

export const updatePost=async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}

export const deletePost=async(req,res)=>{
    try{
        const id=req.params.id
        const tokenId=req.userId

        const post=await prisma.post.findUnique({
            where:{id},
        })

        if(post.userId!==tokenId){
            return res.status(403).json({
                message:"Unauthourized",
                status:403
            })
        }

        await prisma.post.delete({
            where:{id}
        })

        res.status(200).json({
            message:"Post deleted"
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}

export const deleteAllUsers=async(req,res)=>{
    const id=parseInt(req.params.id)
    try {
        // Delete all posts associated with the user
        await prisma.post.deleteMany({
            where: { id }
        });

        res.status(200).json({ message: `All posts by user ${id} have been deleted.` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete posts" });
    }
}