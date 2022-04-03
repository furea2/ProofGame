import React, { useState } from 'react';
import { hot } from 'react-hot-loader';

import { Input } from 'semantic-ui-react'

const InputExampleInput = () => <Input placeholder='Search...' />

const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }:any) => {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <Input
          type="checkbox"
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name="checked" />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <Input type="text" value={title} readOnly={true} placeholder="Input title" />
      </div>
      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
}

export default hot(module)(Task);

{/* <div className={`list-item ${state}`}>
<label className="checkbox">
  <input
    type="checkbox"
    defaultChecked={state === 'TASK_ARCHIVED'}
    disabled={true}
    name="checked"
  />
  <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
</label>
<div className="title">
  <input type="text" value={title} readOnly={true} placeholder="Input title" />
</div>

<div className="actions" onClick={event => event.stopPropagation()}>
  {state !== 'TASK_ARCHIVED' && (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a onClick={() => onPinTask(id)}>
      <span className={`icon-star`} />
    </a>
  )}
</div>
</div> */}