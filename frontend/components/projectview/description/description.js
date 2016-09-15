import React, { Component } from 'react';


const Description = ({name, tagsItems, description, projectDetail, technologiesItems, undefinedText, timeOptions, rating}) => {
        return (
            <div className='description-block'>
                <header className='description-block-header'>
                    <h1>{name}</h1>
                    <div className='description-block-tags'>
                        {tagsItems}
                    </div>
                </header>
                <div className='description-block-content'>
                    <div className='description-block-text'>
                        <div className='description-block-html'
                            dangerouslySetInnerHTML={{__html: description}}/>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    Status
                                </td>
                                <td>
                                    {projectDetail['status'] ? projectDetail['status'] : undefinedText }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Started
                                </td>
                                <td>
                                    {projectDetail['timeBegin'] ? (new Date(projectDetail['timeBegin'])
                                    .toLocaleString("en-US", timeOptions)) : undefinedText}
                                </td>
                            </tr>
                            <tr>
                                <td>Finished</td>
                                <td>
                                    {projectDetail['timeEnd'] ? (new Date(projectDetail['timeEnd'])
                                    .toLocaleString("en-US", timeOptions)) : ""}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Average Rating
                                </td>
                                <td>
                                    {rating}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='description-block-technologies'>
                        {technologiesItems}
                    </div>
                </div>
            </div>
        );
    };

export default Description;