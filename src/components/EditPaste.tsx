import { getConfig } from "@testing-library/react";
import React, {useState, useEffect} from "react";

export interface IPaste{
    id: number
    paste_text: string
    paste_title: string
}

export interface IProp{
    paste: IPaste
}

export interface IComment{
    comment_id: number
    comment: string
    pasteId: number
}

function EditPaste({paste}: IProp): JSX.Element {
    
    const [title, setTitle] = useState(paste.paste_title);
    const [text, setText] = useState(paste.paste_text);

    const [comment, setComment] = useState("")
    const [commentList, setCommentList] = useState<IComment[]>([])
    

    // edit paste function
    const updatePaste = async () => {
        try{
            
            const body = {pasteTitle:title, pasteText:text};
            
            const response = await fetch(`http://localhost:4000/pastes/${paste.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            
            

            
        } catch (error) {
            console.error(error)
            
        }
    };

    // get comments
    const getComments = async () => {
        try {
            const response = await fetch(`http://localhost:4000/pastes/comments/${paste.id}`);
            const jsonData = await response.json();
            
            setCommentList(jsonData)
            
            
        } catch (error) {
            console.error(error.message)
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    const submitComment = async () => {
        try {
            const body = {comment, id: paste.id};
            const response = await fetch("http://localhost:4000/pastes/comments", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

        } catch (error) {
            console.error(error.message);
            
        }
    };

    const deleteComment = async (id: number) => {
        try {
            const deleteComment = await fetch(`http://localhost:4000/comments/${id}`, {
                method: "DELETE"
            });

            setCommentList(commentList.filter(comment => comment.comment_id !== id))
            
        } catch (error) {
            console.error(error.message)
            
        }
    };


    



    return (
        <div>
            {/* <!-- Button to Open the Modal --> */}
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${paste.id}`}>
            Edit
            </button>

            {/* <!-- The Modal --> */}
            <div className="modal" id={`id${paste.id}`}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">Edit text</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                        <div>
                            <h6><b>Title</b></h6>
                            <input 
                                type= "text"   
                                className="form-control" 
                                value={title || ""} 
                                onChange={event => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <h6><b>Text</b></h6>
                                <textarea 
                                    className="form-control" 
                                    value={text} 
                                    onChange={event => setText(event.target.value)}
                                />
                        </div>
                        <div className="mt-3">
                            <p>Add comment</p>
                            <textarea 
                                value = {comment}
                                className="form-control" 
                                placeholder = "Add comment here..."
                                onChange={event => setComment(event.target.value)}
                                />
                            <button
                                type="button" 
                                className="btn btn-warning" 
                                onClick = {submitComment}
                                >
                                    Submit comment
                            </button>
                            
                            <table className = "table table-striped mt-5">
                                <thead>
                                    <tr>
                                        <th>Comment</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    
                                    {commentList.map(comment => (
                                        <tr key = {comment.comment_id}>
                                            <td>{comment.comment}</td>
                                            <td>
                                                <button 
                                                    className = "btn btn-danger"
                                                    onClick = {() => deleteComment(comment.comment_id)}
                                                >
                                                        Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            

                        </div>
                        
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-warning" 
                            onClick={() => updatePaste()}
                        >
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    )

};

export default EditPaste;