import React, { Component } from 'react'
import {Table} from 'react-bootstrap'


export default class Istatistik extends Component {
    render() {
        return (
            
                <div>
                
                <Table className="mt-4" stripped="true"  bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Birim Adı</th>
                                <th>Zamanında Tamamlananlar</th>
                                <th>Geç Tamamlananlar</th>
                                <th>Tamamlanmayanlar</th>
                                <th>Yapım Aşamasında Olanlar</th>
                            </tr>
                        </thead>
                        <tbody>
                                  
                                    <tr>
                                        <td>Birim 1</td>
                                        <td>10</td>
                                        <td>5</td>
                                        <td>0</td>
                                        <td>1</td>
                                    </tr>
                                    
                        </tbody>
                </Table>

                </div>
        )
    }
}
