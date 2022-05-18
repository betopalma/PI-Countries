import React from 'react'
import './PaisDetalle.css'
import { connect } from 'react-redux';
import { getCountriesDetails } from '../Actions/actions';


export class PaisDetalle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        console.log('en didmount',this.props.paisesDetail)
        //getCountriesDetails()
        //this.props.getMovieDetail(this.props.match.params.id)
    }

    render(){
        console.log('en detalle')
        return (
            <div className='Detalle'>
                {/* //Imagen,cod pais,nombre pais,Continente
                //capital,subregion,area,Poblacion
                //actividades turisticas */}
                <div className='DetalleR'>
                    <div id='R11'>
                        <div className='R11D'>
                            {`Código: ${this.props.paisesDetail.IDD}`} 
                        </div>
                        <div className='R11D'>
                            {`Pais: ${this.props.paisesDetail.name}`}
                        </div>
                        <div className='R11D'>
                            {`Continente: ${this.props.paisesDetail.continent}`} 
                        </div>
                        <div className='R11D'>
                            {`Capital: ${this.props.paisesDetail.capital}`} 
                        </div>

                    </div>
                </div>
                <div className='DetalleR'>
                    <div id='R11'>
                    <div className='R11D'>
                            {`Subregión: ${this.props.paisesDetail.subregion}`} 
                        </div>
                        <div className='R11D'>
                            {`Area: ${this.props.paisesDetail.area}`} 
                        </div>
                        <div className='R11D'>
                            {`Población: ${this.props.paisesDetail.population}`} 
                        </div>
                        <div className='R11I'>
                            <img src={this.props.paisesDetail.flags} alt="Bandera" width="100%" height="100%"></img>
                        </div>
                    </div>
                </div>
                <h2>Actividades Turísticas</h2>
                <div className='ActividadesR'>
                    <div id='RA1'>
                        <div className='RA1D'>
                            ID: 
                        </div>
                        <div className='RA1D'>
                            Nombre: 
                        </div>
                        <div className='RA1D'>
                            Dificultad: 
                        </div>
                        <div className='RA1D'>
                            Duracion: 
                        </div>
                        <div className='RA1D'>
                            Temporada: 
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state){
    console.log('En mapStateToProps')
    const paisesDetail = state.paisesDetail
    return {
        paisesDetail
    }
}

const Detail = connect(mapStateToProps, null)(PaisDetalle);
export default Detail

