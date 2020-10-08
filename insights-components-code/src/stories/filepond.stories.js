/* eslint-disable react/jsx-boolean-value */
import React from 'react'

import { Filepond } from '../components/Filepond/filepond'

export default {
  title: 'Filepond',
  component: Filepond
}

export const DefaultFilepond = () => (
  <Filepond
    name='defaultfile'
    labelIdle='Drag your files or browse'
    imagePreviewHeight={120}
    allowMultiple={true}
    acceptedFileTypes={['image/*', 'video/*']}
    labelFileTypeNotAllowed='Invalid file type'
    allowReorder={true}
    dropOnPage={true}
  />
)
