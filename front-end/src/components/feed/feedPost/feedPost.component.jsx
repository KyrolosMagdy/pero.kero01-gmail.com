import React from 'react';
import Button from '../../button/button.component';
import './feedPost.styles.css';

const Message = ({messageFrom, messageDate, id, onStartEdit, onDelete, messageTitle}) => {
   return (
      <article className="post">
         <header className="post__header">
            <h3 className="post__meta">
               Posted by {messageFrom} on {messageDate}
            </h3>
            <h1 className="post__title">{messageTitle}</h1>
         </header>
         {/* <div className="post__image">
      <Image imageUrl={props.image} contain />
    </div>
    <div className="post__content">{props.content}</div> */}
         <div className="post__actions">
            <Button mode="flat" link={id}>
               View
      </Button>
            <Button mode="flat" onClick={onStartEdit}>
               Edit
      </Button>
            <Button mode="flat" design="danger" onClick={onDelete}>
               Delete
      </Button>
         </div>
      </article>

   )
}
export default Message;