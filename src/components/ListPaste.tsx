import { getPackedSettings } from "http2";
import React, {useState, useEffect} from "react";

function ListPaste(): JSX.Element {

    const [pasteList, setPasteList] = useState<any[]>([]);

    // delete function
    const deletePaste = async (id: number) => {
        try {
            const deletePaste = await fetch(`http://localhost:4000/pastes/${id}`, {
                method: "DELETE"
            });
            
            setPasteList(pasteList.filter(paste => paste.id !== id));

            console.log(deletePaste);

            
        } catch (error) {
            console.error(error.message)
            
        }
    }

    // get function
    const getPastes = async () => {
        try {

            const response = await fetch("http://localhost:4000/pastes");
            const jsonData = await response.json();
            console.log(jsonData);

            setPasteList(jsonData);
            
        } catch (error) {
            console.error(error.message)
            
        }
    };

    useEffect(() => {
        getPastes();
    }, []);

    console.log(pasteList);

    return (
        <div>
            <table className = "table table-striped mt-5">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Text</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                
                <tbody>
                    {pasteList.map(paste => (
                        <tr key = {paste.id}>
                            <td>{paste.paste_title}</td>
                            <td>{paste.paste_text}</td>
                            <td>Edit</td>
                            <td>
                                <button 
                                    className = "btn btn-danger"
                                    onClick = {() => deletePaste(paste.id)}
                                >
                                        Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPaste;