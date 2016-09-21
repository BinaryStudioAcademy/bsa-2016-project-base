import React, { Component } from 'react';
import { FaStar, FaStarHalfEmpty, FaStarO, FaThumbsUp } from 'react-icons/lib/fa';


const Description = ({name, tagsItems, description, projectDetail, technologiesItems, undefinedText, timeOptions, rating, setRate}) => {

    let stars = [];
    for (let i=1; i <= rating.avgRate.rate; i++) {
        stars.push(<FaStar key={i} size={21} />);
    }
    parseInt(rating.avgRate.rate) < rating.avgRate.rate ? stars.push(<FaStarHalfEmpty key={stars.length+1} size={21} />) : null;
    let emptyStarsNum = 5 - stars.length;
    for (let i=1; i <= emptyStarsNum; i++) {
        stars.push(<FaStarO key={stars.length+1} size={21} />);
    }

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
                                    <span className='star-wrap' >{stars}</span>
                                    {` (${rating.avgRate.rate.toFixed(2)})`}
                                    {` (${rating.avgRate.voices} `}<FaThumbsUp size={15} />{`)`}
                                </td>
                            </tr>
                            { !rating.canISetRate ?
                                <tr>
                                    <td>
                                        Choose Your Rating
                                    </td>
                                    <td>
                                    <span className='star-edit-wrap' >
                                        <input type="checkbox"
                                               className='star-input'
                                               id={`star-rate-1`}
                                               onChange={setRate.bind(this,1)}
                                        />
                                        <label htmlFor={`star-rate-1`}
                                               className='star-label'
                                        ><FaStar size={21} /></label>
                                        <input type="checkbox"
                                               className='star-input'
                                               id={`star-rate-2`}
                                               onChange={setRate.bind(this,2)}
                                        />
                                        <label htmlFor={`star-rate-2`}
                                               className='star-label'
                                        ><FaStar size={21} /></label>
                                        <input type="checkbox"
                                               className='star-input'
                                               id={`star-rate-3`}
                                               onChange={setRate.bind(this,3)}
                                        />
                                        <label htmlFor={`star-rate-3`}
                                               className='star-label'
                                        ><FaStar size={21} /></label>
                                        <input type="checkbox"
                                               className='star-input'
                                               id={`star-rate-4`}
                                               onChange={setRate.bind(this,4)}
                                        />
                                        <label htmlFor={`star-rate-4`}
                                               className='star-label'
                                        ><FaStar size={21} /></label>
                                        <input type="checkbox"
                                               className='star-input'
                                               id={`star-rate-5`}
                                               onChange={setRate.bind(this,5)}
                                        />
                                        <label htmlFor={`star-rate-5`}
                                               className='star-label'
                                        ><FaStar size={21} /></label>
                                    </span>
                                    </td>
                                </tr>
                                : null}
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