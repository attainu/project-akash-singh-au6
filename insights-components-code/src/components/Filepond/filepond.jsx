import React from 'react'
import 'filepond/dist/filepond.min.css'
import './filepond.css'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview)

export const Filepond = ({ ...props }) => {
  return <FilePond {...props} />
}
