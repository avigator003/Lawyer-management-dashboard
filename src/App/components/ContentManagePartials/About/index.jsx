import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlog, createBlog } from '../../../../store/Actions';
import { Form, Button } from 'react-bootstrap';
import { notification, Card } from 'antd';
import api from '../../../../resources/api';
import { result } from 'lodash';
import CKEditor from 'ckeditor4-react';

const validNameRegex = RegExp(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
);

const EditAbout = (props) => {
  const [state, setState] = useState({
    title: '',
    author: '',
    description: '',
    imageFile: '',

  });
  const [editMode, setEditMode] = useState(false);
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState({});
  const [disabled, setdisabled] = useState(false)
  //image url
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const selectedBlog = useSelector((state) => state.Blog.selected);

  const fetch = () => {
    api.get("/aboutus/showall").then(data => {
      console.log(data.data.data[data.data.data.length - 1])
      let savedData = data.data.data[data.data.data.length - 1];
      setState({
        title: savedData.title,
        description: savedData.description,
        image: savedData.image
      })
      console.log({ state })
    })
  }
  useEffect(() => {
    // if (!selectedBlog) {
    //   setEditMode(false);
    // } else {
    //   setState({ ...selectedBlog });
    //   setEditMode(true);
    // }
    fetch()
  }, []);



  const handleChange = (e) => {
    e.persist();
    setDisplay(false);
    const { name, value } = e.target;
    let errors = error;
    switch (name) {
      case 'title':
        errors.title =
          value.length == 0
            ? 'Title is Required'
            : value.length > 60
              ? 'Title is too Long'
              : '';
        break;
      /*
    case 'author':
      errors.author =
        value.length == 0
          ? 'Author is required'
          : !validNameRegex.test(value)
            ? 'Author Name must be in characters!'
            : '';
      break;
      */
      case 'shortDescription':
        errors.shortDescription =
          value.length == 0
            ? 'Short Description is required'
            : value.length > 110
              ? 'Short Description is too Long'
              : value.length < 50
                ? 'Short Description is too Short'
                : '';
        break;
      case 'description':
        errors.description =
          value.length == 0
            ? 'Description is required'
            : value.length < 110
              ? 'Description is too Short'
              : '';
        break;
      default:
        break;
    }
    setError({ ...errors });
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!display) {
      const validateForm = (error) => {
        let valid = true;
        Object.values(error).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
      };
      if (validateForm(error)) {
        checkValidity();
      } else {
        setDisplay(true);
        return notification.warning({
          message: 'Failed to save data',
        });
      }
    }
  };

  function checkValidity() {
    if (!Object.keys(state).every((k) => state[k] !== '')) {
      setDisplay(true);
      return notification.warning({
        message: 'Fields Should Not Be Empty',
      });
    } else {
      setdisabled(true);
      if (state.imageFile) {
        //console.log("image")
        const files = state.imageFile;
        const uploadData = new FormData();
        uploadData.append('image', files);
        console.log('data ', uploadData);
        api
          .post(`/footer/upload`, uploadData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((newresult) => {
            console.log(newresult);
            api
              .post('/aboutus/create', { ...state, image: newresult.data.message })
              .then((result) => {
                // image upload to the server
                console.log({ result })
                notification.success({ message: "Changes Saved!" })
                fetch()
                setdisabled(false);
              })
              .catch((err) => {
                console.log({ err });
                notification.error({ message: "Please try again later!" })
                setdisabled(false);

              });
          });

      } else {
        //console.log("not image")
        api
          .post('/aboutus/create', { ...state })
          .then((result) => {
            // image upload to the server
            console.log({ result })
            setdisabled(false);
            notification.success({ message: "Changes Saved!" })

          })
          .catch((err) => {
            setdisabled(false);
            console.log({ err });
            notification.error({ message: "Please try again later!" })
          });
      }
    }
    // props.history.goBack();
  }

  // handel Image Upload
  const uploadImage = (e) => {
    setState({ ...state, imageFile: e.target.files[0] });
  };

  return (
    <>
      <Card>
        <h3 className="text-center">Edit About Page</h3>
        <div className="banner-img col-lg-4">
          <img src={state.image} width="90%" alt="Banner Img" />
        </div>
        <Form className="form-details">
          <Form.Group controlId="formGroupEmail">
            <input
              type="file"
              name="file"
              onChange={uploadImage}
              placeholder="Upload Image"
            />
          </Form.Group>

          <Form.Group controlId="formGroupEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Feature Title"
              value={state['title']}
              onChange={handleChange}
            />
            <p className="help-block text-danger">{error.title}</p>
          </Form.Group>
            Description
          <CKEditor data={state.description} onChange={evt => setState((st) => ({ ...st, ["description"]: evt.editor.getData() }))} />
          <p className="help-block text-danger">{error.description}</p>
          <Button disabled={disabled} onClick={handleSubmit}>Save</Button>
        </Form>
      </Card>
    </>
  );
};

export default EditAbout;
