import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import Paragraph from '@editorjs/paragraph'
import { uploadImage } from '@/utils/imagesAPI'

export const EDITOR_JS_TOOLS = {
  paragraph: Paragraph,
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file){
          return uploadImage(file)
            .then(url => { return {
              success: 1,
              file: { url: url }
            }})
            .catch(err => {
              return {
                success: 0,
                message: err
              }
            })
        },
        uploadByUrl(url){
          return fetch(url)
            .then(res => res.blob())
            .then(blob => uploadImage(blob))
            .then(url => { return {
              success: 1,
              file: { url: url }
            }})
            .catch(err => {
              return {
                success: 0,
                message: err
              }
            })
        }
      }
    }
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
