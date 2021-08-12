import React, {useState, useEffect} from "react";

export interface IPaste{
    id: number
    paste_text: string
    paste_title: string
}

export interface IProp{
    paste: IPaste
}

function EditPaste({paste}: IProp): JSX.Element {
    
    const [title, setTitle] = useState(paste.paste_title);
    const [text, setText] = useState(paste.paste_text);

    // edit paste function
    const updatePaste = async () => {
        console.log("Hey I'm here");
        try{
            
            const body = {pasteTitle:title, pasteText:text};
            console.log(body, paste.id);
            const response = await fetch(`http://localhost:4000/pastes/${paste.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            
            

            
        } catch (error) {
            console.error(error)
            
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
                <div className="modal-dialog">
                    <div className="modal-content">

                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">Edit text</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                        <div>
                            <h6>Title</h6>
                            <input 
                                type= "text"   
                                className="form-control" 
                                value={title || ""} 
                                onChange={event => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <h6>Text</h6>
                            <input 
                                type= "text" 
                                className="form-control" 
                                value={text} 
                                onChange={event => setText(event.target.value)}
                            />
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