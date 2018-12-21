import React, { Component } from 'react'
import Layout from '../components/layout'
// import Lightbox from 'react-images'
import axios from 'axios'
import { Upload, Icon, message } from 'antd'
import { MediumSpace } from '../components/styledComponent'
import styled, { hydrate, css, cx } from 'react-emotion'  // eslint-disable-line

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

const MockList = [
  { src: '/static/girl.jpg' },
  { src: '/static/gold.jpg' },
  { src: '/static/blocks.jpg' },
  { src: '/static/star.jpg' },
  { src: '/static/tree.jpg' }
]

function getBase64 (img, callback) {
  const reader = new FileReader() // eslint-disable-line
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload (file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 3
  if (!isLt2M) {
    message.error('Image must smaller than 3MB!')
  }
  return isJPG && isLt2M
}

class Avatar extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.customRequest = this.handleChange.bind(this)
  }

  handleChange (info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false
      }))
    }
  }

  customRequest ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials
  }) {
    // EXAMPLE: post form-data with 'axios'
    const formData = new FormData() // eslint-disable-line
    const onTransferDone = this.props.onTransferDone
    // console.log(this.props)
    let newFile = new File([file], 'image.' + file.name.split('.').pop(), { type: file.type }) // eslint-disable-line
    // console.log('file-name', newFile.name)
    if (data) {
      Object.keys(data).map(key => {
        formData.append(key, data[key])
      })
    }
    formData.append(filename, newFile)

    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file)
        }
      })
      .then(res => {
        console.log(res)
        onSuccess(res)
        onTransferDone(res)
      })
      .catch(onError)

    return {
      abort () {
        console.log('upload progress is aborted.')
      }
    }
  }

  render () {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl
    return (
      <Upload
        name='file'
        listType='picture-card'
        className='avatar-uploader db'
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        customRequest={this.customRequest}
        action='http://10.141.208.253:2333/submit'
        data={{ name: 'f' }}
        supportServerRender
      >
        {imageUrl ? <img src={imageUrl} alt='avatar' /> : uploadButton}
      </Upload>
    )
  }
}

class Redraw extends Component {
  constructor () {
    super()
    this.state = {
      lightboxIsOpen: false,
      transfer: ''
    }
    this.onTransferDone = this.onTransferDone.bind(this)
  }
  closeLightbox () {}

  onTransferDone (res) {
    this.setState({
      transfer: 'http://10.141.208.253:2333' + res.data
    })
  }

  render () {
    return (
      <Layout>
        <section className='relative min-vh-100 overflow-hidden bg-near-white' css={{
          paddingTop: '76px',
          minHeight: '40rem'
        }}>
          <div className='center mw9 w-90 h-100 pv2'>
            <h1 className='tc black'>1. Choose your favorite style</h1>
            <div className='flex flex-auto justify-between pa1 ba b--black'>
              <div className='w-30 flex flex-column'>
                <img src={MockList[0].src} alt={MockList[0].src.split('.')[0]} />
                <img src={MockList[2].src} alt={MockList[2].src.split('.')[0]} className='mt2' />
              </div>
              <div className='w-30 flex flex-column'>
                <img src={MockList[3].src} alt={MockList[2].src.split('.')[0]} />
                <img src={MockList[1].src} alt={MockList[1].src.split('.')[0]} className='mt2' />
              </div>
              <div className='w-30 flex flex-column'>
                <img src={MockList[4].src} alt={MockList[4].src.split('.')[0]} />
              </div>
            </div>

            <div className='mt3 flex flex-auto flex-wrap'>
              <div className='w-100 w-50-l br-l'>
                <h1 className='tc black'>2. Upload your photo</h1>
                <div className='flex flex-auto items-center justify-center'>
                  <Avatar onTransferDone={this.onTransferDone} />
                </div>
              </div>
              <div className='w-100 w-50-l'>
                <h1 className='tc black'>3. Enjoy</h1>
                <img src={this.state.transfer} />
              </div>
            </div>
            <MediumSpace />
          </div>
        </section>
      </Layout>
    )
  }
}

export default Redraw
