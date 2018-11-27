import React, { Component } from 'react';


const CATEGORY_STATUS = {
    AVAILABLE: 'Available',
    NOT_AVAILABLE: 'Not Available'
};

class ListCategories extends Component {

    constructor() {
        super();
        this.state = {
            title: 'Simple Inventory Application',
            categories: []

        }
    }

    checkAvailability(status) {
        let availability = status === '1' ? CATEGORY_STATUS.AVAILABLE : CATEGORY_STATUS.NOT_AVAILABLE;
        return availability;
    }

    componentDidMount() {
        console.log('Component has mounted');
        this.getCategories();
    }

    getCategories() {
        var self = this;
        fetch('http://localhost:3000/api/categories')
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        //console.log(data);
                        let categories = self.state.categories;
                        categories.concat(data);
                        self.setState({
                            categories: data
                        })
                    })
            })
    }

    addcategory(event) {
        var self = this;
        event.preventDefault();
        let data = {
            category_name: this.refs.category_name.value,
            category_status: this.refs.category_status.value,
            category_active: "1"
        };

        var request = new Request('http://localhost:3000/api/post-category', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });

        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        self.getCategories();
                    })
            })
            .catch(function (err) {
                console.log(err);
            })

    }

    editCategory() {

    }

    removeCategory(id) {
        var self = this;
        let categories = this.state.categories;
        let category = categories.find(function (category) {
            return category.category_id === id
        });

        var request = new Request('http://localhost:3000/api/delete-category/' + id, {
            method: 'POST'
        });

        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        self.getCategories();
                    })
            })
            .catch(function (err) {
                console.log(err);
            })
    }


    render() {
        let title = this.state.title;
        let categories = this.state.categories;
        return (

            <div className="category-list">
                <h1>{title}</h1>
                <div className="container-fluid">
                <div class="card mb-4 shadow-sm col-md-4">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Add category</h4>
          </div>
          <div class="card-body">
            <form ref="categoryForm">
                    <input type="text" className="form-control" ref="category_name" placeholder="" />
                    <br />
                    <select className="form-control" ref="category_status">
                        <option value="">~~SELECT~~</option>
                        <option value="1">Available</option>
                        <option value="0">Not Available</option>
                    </select>
                    <br />
                    <button class="btn btn-lg btn-block btn-primary" onClick={this.addcategory.bind(this)}>Save category</button>
                </form>
          </div>
        </div>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Manage categories</h4>
                        </div>
                        <div className="card-body">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Category Name</td>
                                        <td>Status</td>
                                        <td>Options</td>
                                    </tr>

                                </thead>
                                <tbody>
                                    {categories.map(category => <tr key={category.category_id}>
                                        <td>{category.category_name}  </td>
                                        <td>{this.checkAvailability(category.category_status)} </td>
                                        <td>
                                            {/* <button className="btn btn-primary" onClick={this.removeCategory.bind(this, category.category_id)}>Edit</button> &nbsp; */}
                                            <button className="btn btn-danger" onClick={this.removeCategory.bind(this, category.category_id)}>Remove</button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListCategories;
