import React from 'react';
import Button from '../../button/button.component';
import './feedPost.styles.css';

const Message = (props) => {
   return (
      <article className="post">
         <header className="post__header">
            <h3 className="post__meta">
               Posted by {props.author} on {props.date}
            </h3>
            <h1 className="post__title">{props.title}</h1>
         </header>
         {/* <div className="post__image">
      <Image imageUrl={props.image} contain />
    </div>
    <div className="post__content">{props.content}</div> */}
         <div className="post__actions">
            <Button mode="flat" link={props.id} buttonContent={'View'} />
            <Button mode="flat" onClick={props.onStartEdit} buttonContent={'Edit'}/>
            <Button mode="flat" design="danger" onClick={props.onDelete} buttonContent={'Delete'}/>
         </div>
      </article>

   )
}
export default Message;