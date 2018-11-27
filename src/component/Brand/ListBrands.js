import React, { Component } from 'react';


const BRAND_STATUS = {
    AVAILABLE: 'Available',
    NOT_AVAILABLE: 'Not Available'
};

class ListBrands extends Component {

    constructor() {
        super();
        this.state = {
            title: 'Simple Inventory Application',
            brands: []

        }
    }

    checkAvailability(status) {
        let availability = status === '1' ? BRAND_STATUS.AVAILABLE : BRAND_STATUS.NOT_AVAILABLE;
        return availability;
    }

    componentDidMount() {
        console.log('Component has mounted');
        this.getBrands();
    }

    getBrands() {
        var self = this;
        fetch('http://localhost:3000/api/brands')
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        //console.log(data);
                        let brands = self.state.brands;
                        brands.concat(data);
                        self.setState({
                            brands: data
                        })
                    })
            })
    }

    addBrand(event) {
        var self = this;
        event.preventDefault();
        let data = {
            brand_name: this.refs.brand_name.value,
            brand_status: this.refs.brand_status.value,
            brand_active: "1"
        };

        var request = new Request('http://localhost:3000/api/post-brand', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });

        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        self.getBrands();
                    })
            })
            .catch(function (err) {
                console.log(err);
            })

    }

    editBrand() {

    }

    removeBrand(id) {
        var self = this;
        let brands = this.state.brands;
        let brand = brands.find(function (brand) {
            return brand.brand_id === id
        });

        var request = new Request('http://localhost:3000/api/delete-brand/' + id, {
            method: 'POST'
        });

        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        self.getBrands();
                    })
            })
            .catch(function (err) {
                console.log(err);
            })
    }


    render() {
        let title = this.state.title;
        let brands = this.state.brands;
        return (

            <div className="brand-list">
                <h1>{title}</h1>
                <div className="container-fluid">
                <div class="card mb-4 shadow-sm col-md-4">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Add Brand</h4>
          </div>
          <div class="card-body">
            <form ref="brandForm">
                    <input type="text" className="form-control" ref="brand_name" placeholder="" />
                    <br />
                    <select className="form-control" ref="brand_status">
                        <option value="">~~SELECT~~</option>
                        <option value="1">Available</option>
                        <option value="0">Not Available</option>
                    </select>
                    <br />
                    <button class="btn btn-lg btn-block btn-primary" onClick={this.addBrand.bind(this)}>Save Brand</button>
                </form>
          </div>
        </div>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Manage Brands</h4>
                        </div>
                        <div className="card-body">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Brand Name</td>
                                        <td>Status</td>
                                        <td>Options</td>
                                    </tr>

                                </thead>
                                <tbody>
                                    {brands.map(brand => <tr key={brand.brand_id}>
                                        <td>{brand.brand_name}  </td>
                                        <td>{this.checkAvailability(brand.brand_status)} </td>
                                        <td>
                                            {/* <button className="btn btn-primary" onClick={this.removeBrand.bind(this, brand.brand_id)}>Edit</button> &nbsp; */}
                                            <button className="btn btn-danger" onClick={this.removeBrand.bind(this, brand.brand_id)}>Remove</button>
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

export default ListBrands;
