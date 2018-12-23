import React, { Component } from 'react'
import Layout from '../components/layout'
import axios from 'axios'
import { Upload, Icon, message } from 'antd'
import styled, { hydrate, css, cx } from 'react-emotion'  // eslint-disable-line

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

const baseUrl = 'http://10.141.208.253:2333'

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
  const isLt2M = file.size / 1024 / 1024 < 5
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!')
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
    this.customRequest = this.customRequest.bind(this)
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

    // console.log(data.name)

    axios
      .post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file)
        }
      })
      .then(res => {
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
        className='avatar-uploader w-100 db center ma0'
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        customRequest={this.customRequest}
        action={baseUrl + '/custom'}
        supportServerRender
      >
        {imageUrl ? <img src={imageUrl} alt='avatar' /> : uploadButton}
      </Upload>
    )
  }
}

class Custom extends Component {
  render () {
    return (<Layout>
      <section className='relative min-vh-100 overflow-hidden bg-near-white' css={{
        paddingTop: '76px',
        minHeight: '40rem'
      }}>
        <div className='center mw9 w-90 vh-100 pv2'>
          <h1 className='tc'>Custom your filter</h1>
          <h4 className='tc'>Upload your style and it will be added to the style list.</h4>
          <div className='w-100 w-60-l center flex flex-auto items-center justify-center mt'>
            <Avatar />
          </div>
        </div>
      </section>
    </Layout>
    )
  }
}

export default Custom
