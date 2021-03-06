import React from 'react'
import { Card , Table , Button , Form} from 'react-bootstrap'
import { Modal, notification, Popconfirm, message, Button as AntdButton } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import {connect} from 'react-redux'
import EditTask from '../../EditForm'
import api from '../../../../../resources/api'
import ReactDOM from 'react-dom'
const { Option } = Select;

const user = JSON.parse(window.localStorage.getItem('Case.user'))
let response = {};
let options = null;
let list = {}
const selectBefore = (
    <Select defaultValue="Firm User" className="select-before">
      <Option value="FirmUser">Firm User</Option>
      <Option value="Contacts">Contacts</Option>
    </Select>
  );
class ViewList extends React.Component{
    constructor(){
        super()
        this.state = {
            tableData : "",
            visible : false,
            Data : { priority: 'Normal', matter: '' },
            editMode : false,
            disable :false
        }
    }
    handleDelete = (index) =>{
      console.log("from delete")
      console.log(index)
      console.log(list)
        const data = list
        const id = data.tasks[index]._id
        console.log(id)
        data.tasks.splice(index, 1)
        api
        .post('/tasks/list/edit/'+ data._id, data)
        .then((res2) => {
            console.log(res2)
            let tabledata = this.state.tableData
            delete tabledata[index]
            this.setState({tableData : tabledata})
            console.log(tabledata)
            api.get('tasks/delete/' + id).then((res)=>{
              console.log(res)
              notification.success({message : "Task deleted from the list"})
            })
           
            
        })
        .catch(() => {
             notification.error({message : "Failed."})
        });
        console.log(data)
    }

    handleEdit = (value , index) => {
      this.setState({ editMode: true });
      this.setState({ Data: value });
      console.log(value)
      this.setState({ selected: value});
    }
    componentDidMount(){
        api.get('/tasks/list/view/'+this.props.location.state.id).then((res)=>{
            let tableData = []
            list = res.data.data
            console.log(res)
            res.data.data.tasks.map((value,index)=>{
              let matter = value.matter.matterDescription
              value.matter = value.matter._id
               const temp = <tr>
                                <td>{value.taskName}</td>
                               {/* <td>{value.assignee}</td> */}
                                <td>{value.priority}</td>
                                <td>{value.description}</td>
                                <td>{value.dueDate.substring(0,10)}</td>
                                <td>{matter}</td>
                                <td><AntdButton onClick={()=>this.handleEdit(value,index)} type="link">Edit</AntdButton></td>
                                <td><Popconfirm
                                      title="Are you sure you want to delete"
                                      onConfirm={()=>this.handleDelete(index)}
                                      //onCancel={this.cancel}
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                       <AntdButton  type="link" danger>Delete</AntdButton>
                                    </Popconfirm>
                                 
                                  </td>
                            </tr>
              console.log(temp)
              tableData.push(temp)
            })
            this.setState({tableData : tableData})
            console.log(this.state.tableData)
          })
          api
            .get('/matter/viewforuser/' + this.props.userId)
            .then((res) => {
                response = res.data.data
                options = response.map((value, index) => {
                    if (index == 0) {
                        let newdata = this.state;
                        newdata.Data.matter = value._id;
                        this.setState(newdata);
                    }
                    return <option value = {value._id}>{value.matterDescription}</option>;
                    });
                this.setState({options : options})
            });
    
           
    }
    handleCancel = () => {
      ReactDOM.findDOMNode(this.messageForm).reset()

        this.setState({
          visible: false,
          editMode : false,
          Data : { priority: 'Normal', matter: '' }
        });
      };
    
      handleChange = (e) => {
        e.persist();
        console.log(e)
        let newState = this.state;
        newState.Data[e.target.id] = e.target.value;
        this.setState(newState);
        console.log(this.state.Data);

    };

    handleOk = (e) => {

        e.preventDefault();
        notification.destroy();
        if(this.state.Data.taskName === '' || this.state.Data.taskName === undefined ){
          notification.warning({
            message: 'Please provide a task name',
          });
        }else
        if(this.state.Data.description === '' ||this.state.Data.description === undefined  ){
          notification.warning({
            message: 'Please provide a description',
          });
        }else
        if( this.state.Data.dueDate === '' || this.state.Data.dueDate === undefined  ){
          notification.warning({
              message: 'Please select a due date',
            });
        }else
        if( this.state.Data.matter === "" || this.state.Data.matter === undefined ){
          notification.warning({
            message: 'Please select a matter',
          });
          
        }
        else {
          this.setState({
            disable : true
          })
          const data = this.state.Data;
          data.userId = this.props.userId;
          if (this.state.editMode) {
            api
              .post('tasks/edit/' + data._id, data)
              .then((res) => {
                console.log(res)
                this.setState({
                  disable : false
                })
                this.componentDidMount()
                notification.success({message : "Task Edited"})
              }
              )
              .catch(() => {
                this.openNotificationWithFailure('error');
                this.setState({
                  disable : false
                })
              }).then(()=>{
                ReactDOM.findDOMNode(this.messageForm).reset()
              })
          }else{
            this.setState({
              confirmLoading: true,
            });
          
          
              api
                .post('/tasks/create', data)
                .then((res) => {
                    console.log(res)
                      list.tasks.push(res.data.data._id)
                      api
                      .post('/tasks/list/edit/'+list._id, list)
                      .then((res2) => {
                          console.log(res2)
                          this.setState({
                            disable : false
                          })
                          this.componentDidMount()
                          notification.success({message : "Task Added to the list"})
                      })
                      .catch(() => {
                          notification.error({message : "Failed."})
                          this.setState({
                            disable : false
                          })
                      }).then(()=>{
                        ReactDOM.findDOMNode(this.messageForm).reset()
                      })
                  })
          
           }
           setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
              editMode : false
            });
          // window.location.reload();
          }, 1000);
            
            }
           
      };
    
    render(){
        return <div>
                <Card>
                    <Card.Header>
                        <h4>{this.props.location.state.name}</h4>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <td>
                                        {this.props.location.state.name}
                                    </td>
                                    <th>
                                        Description
                                    </th>
                                    <td>
                                        {this.props.location.state.description}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Practice Area
                                    </th>
                                    <td>
                                        {this.props.location.state.practiseArea}
                                    </td>

                                </tr>
                            </tbody>
                        </Table>

                    </Card.Body>
                    
                </Card>
                <Card>
                    <Card.Header>
                        <div  className="d-flex example-parent">
                            <h3 className="p-2 col-example">
                                Task Templates
                            </h3>
                            <div className="ml-auto p-2 col-example">
                                <Button onClick={()=>{this.setState({visible : true})}} variant="success">
                                    Add task to the list
                                </Button>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                <th>Name</th>
                                {/* <th>Assignee</th> */}
                                <th>Priority</th>
                                <th>Permissions</th>
                                <th>Due At</th>
                                <th>Matter</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                   this.state.tableData
                               }
                                
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Modal
          title="Create New Task"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          footer={[
            <AntdButton  onClick={this.handleCancel}>
              Cancel
            </AntdButton>,
            <AntdButton type="primary" disabled = {this.state.disable} onClick={this.handleOk}>
              Create Task
            </AntdButton>,
          ]}
        >
       <Form 
       className="form-details" 
       id='myForm'
       className="form"
       ref={ form => this.messageForm = form }
       >
        <Form.Group controlId="taskName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Task Name"
            defaultValue={this.state.name}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Due Date"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows="3"
            onChange={this.handleChange}
          />
        </Form.Group>

      {/*
        <Form.Group controlId="taskName">
          <Form.Label>Assignee</Form.Label>
          <div>
            <Input addonBefore={selectBefore} size="large" suffix={<UserOutlined className="site-form-item-icon" />}  placeholder="Type a name..." />
          </div>
        </Form.Group>
      */
      }

        <Form.Group controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Normal"
            required
            onChange={this.handleChange}
          >
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="matter">
          <Form.Label>Matter</Form.Label>
          <Form.Control
            required
            as="select"
            onChange={this.handleChange}
            name="matter"
          >
            <option>Select a matter</option>
            {this.state.options}
          </Form.Control>
        </Form.Group>
        <br />
        {
          /*
            <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Notify me when the task is completed" />
        </Form.Group>
        <br />
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Notify assignee via email" />
        </Form.Group>
        <br />
          */

        }
       
      </Form>
   
        </Modal>
                <Modal
                  title="Edit task"
                  visible={this.state.editMode}
                  confirmLoading={this.state.confirmLoading}
                  onCancel={this.handleCancel}
                  onOk={this.handleOk}
                  footer={[
                    <AntdButton  onClick={this.handleCancel}>
                      Cancel
                    </AntdButton>,
                    <AntdButton type="primary" disabled = {this.state.disable} onClick={this.handleOk}>
                      Update Task
                    </AntdButton>,
                  ]}
                >
                  <Form 
                  id='myForm'
                  className="form"
                  ref={ form => this.messageForm = form }
                  className="form-details">
                          <Form.Group controlId="taskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              defaultValue={this.state.Data.taskName}
                              onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="dueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                              type="date"
                              defaultValue={this.state.Data.dueDate ? this.state.Data.dueDate.substring(0,10) : ""}
                              onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              required
                              defaultValue={this.state.Data.description}
                              as="textarea"
                              rows="3"
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                          <Form.Group controlId="matter">
                                    <Form.Label>Matter</Form.Label>
                                    <Form.Control
                                      required
                                      as="select"
                                      value={this.state.Data.matter}
                                      onChange={this.handleChange}
                                      name="matter"
                                    >
                                      <option>Select a matter</option>
                                      {this.state.options}
                                    </Form.Control>
                                  </Form.Group>

                        {
                          /*
                            <Form.Group controlId="taskName">
                            <Form.Label>Assignee</Form.Label>
                            <div>
                              <Input addonBefore={selectBefore} size="large" suffix={<UserOutlined className="site-form-item-icon" />}  placeholder="Type a name..." />
                            </div>
                          </Form.Group>
                          */
                        }

                          <Form.Group controlId="priority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control
                              as="select"
                            
                              required
                              defaultValue={this.state.Data.priority}
                              onChange={this.handleChange}
                            >
                              <option>Low</option>
                              <option>Normal</option>
                              <option>High</option>
                            </Form.Control>
                          </Form.Group>
                          
                          <br />
                          {
                            /* 
                            <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Notify me when the task is completed" />
                          </Form.Group>
                          <br />
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Notify assignee via email" />
                          </Form.Group>
                          <br />
                            */
                          }
                        </Form>
            
                </Modal>
            
                </div>

    }
}
const mapStateToProps = state => ({
    userId: state.user.token.user._id
  });
  
  export default connect(mapStateToProps)(ViewList)