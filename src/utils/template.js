import * as React from 'react'

const moment = require('moment')

const LOGO_SRC_PATH = '/img/logo/'

const PeriodDescriptionOfAccountStatement = ({ fromDate, toDate }) => {
    if (fromDate != null && toDate != null) {
        return (
            <div style={{ fontSize: '10px' }}>
                <span>du </span>
                <span
                    style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                    }}
                >
                    {fromDate ?? ' - '}
                </span>
                <span style={{ marginLeft: '5px' }}>au </span>
                <span
                    style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                    }}
                >
                    {toDate ?? ' - '}
                </span>
            </div>
        )
    }

    if (fromDate != null && toDate == null) {
        return (
            <div style={{ fontSize: '10px' }}>
                <span>depuis </span>
                <span
                    style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                    }}
                >
                    {fromDate ?? ' - '}
                </span>
            </div>
        )
    }

    if (fromDate == null && toDate != null) {
        return (
            <div style={{ fontSize: '10px' }}>
                <span>Avant le </span>
                <span
                    style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                    }}
                >
                    {toDate}
                </span>
            </div>
        )
    }

    return (
        <div>
            <span>depuis l'ouveture du compte</span>
        </div>
    )
}

export const DocumentModel = React.forwardRef((props, ref) => {
    const { account, entries = [], fromDate, toDate } = props
    // eslint-disable-line max-len

    const sumByType = (type) => {
        let result = 0
        entries.forEach((el) => {
            if (el.type === type) result += parseInt(el.transactionAmount)
        })

        return result
    }
    return (
        <div
            style={{
                padding: '10px 25px',
                fontSize: '11px',
                fontFamily: 'Roboto',
                backgroundColor: '#fff',
            }}
            ref={ref}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    width: '100%',
                }}
            >
                <div>
                    <img
                        style={{ width: '75px' }}
                        src={`${LOGO_SRC_PATH}logo-light-streamline.png`}
                        alt="logo"
                    />
                </div>
                <div>
                    <span
                        style={{
                            fontWeight: 'normal',
                            marginLeft: '5px',
                            fontSize: '10px',
                        }}
                    >
                        Imprimé en date du :
                    </span>
                    <span
                        style={{
                            fontWeight: 'bold',
                            marginLeft: '5px',
                            fontSize: '10px',
                        }}
                    >
                        {moment(new Date()).format('DD-MM-YYYY HH:mm')}
                    </span>
                </div>
            </div>
            <div style={{ padding: '10px 0' }}>
                <h2
                    style={{
                        textAlign: 'center',
                        borderBottom: '2px solid #aaa',
                        padding: '20px',
                    }}
                >
                    Relevé de compte
                </h2>
            </div>
            <div tyle={{ padding: '10px 50px', marginTop: '10px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <h4>Informations du compte</h4>
                        <br />

                        <div>
                            <span>Intitulé du compte :</span>
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: '5px',
                                }}
                            >
                                {account?.name}
                            </span>
                        </div>

                        <div>
                            <span>Numéro de compte :</span>
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: '5px',
                                }}
                            >
                                {account.accountNumber}
                            </span>
                        </div>

                        <div>
                            <span>Devise :</span>
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: '5px',
                                }}
                            >
                                {account.currency}
                            </span>
                        </div>

                        <div>
                            <span>Balance :</span>
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: '5px',
                                }}
                            >
                                {account.balance}
                            </span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px' }}>
                            <span>Transactions effectuées en période: </span>
                        </div>
                        <PeriodDescriptionOfAccountStatement
                            fromDate={fromDate}
                            toDate={toDate}
                        />
                    </div>
                </div>
            </div>
            <br />
            <table
                style={{
                    width: '100%',
                    marginTop: '10px',
                    textAlign: 'center',
                    border: '1px solid #000',
                }}
            >
                <thead
                    style={{
                        padding: '10px',
                        height: '40px',
                        border: '1px solid #aaa',
                        backgroundColor: '#aaa',
                        color: 'white',
                    }}
                >
                    <tr>
                        <th
                            style={{
                                padding: '10px 5px',
                                height: '25px',
                                textAlign: 'left',
                                border: '2px solid #aaa',
                            }}
                        >
                            Date
                        </th>
                        <th
                            style={{
                                padding: '10px 5px',
                                height: '25px',
                                textAlign: 'left',
                                border: '2px solid #aaa',
                            }}
                        >
                            N° Transaction
                        </th>
                        <th
                            style={{
                                padding: '10px 5px',
                                height: '25px',
                                textAlign: 'left',
                                border: '2px solid #aaa',
                            }}
                        >
                            Motif
                        </th>
                        <th
                            style={{
                                padding: '10px 5px',
                                height: '25px',
                                textAlign: 'left',
                                border: '2px solid #aaa',
                            }}
                        >
                            Débit ({account.currency})
                        </th>
                        <th
                            style={{
                                padding: '10px 5px',
                                height: '25px',
                                textAlign: 'left',
                                border: '2px solid #aaa',
                            }}
                        >
                            Crédit ({account.currency})
                        </th>
                        <th
                            style={{
                                padding: '10px 5px',
                                height: '25px',
                                textAlign: 'left',
                                border: '2px solid #aaa',
                            }}
                        >
                            Solde
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((value) => (
                        <tr
                            key={Math.random()}
                            style={{
                                padding: '5px 10px',
                                height: '25px',
                            }}
                        >
                            <td
                                style={{
                                    padding: '10px 5px',
                                    height: '25px',
                                    textAlign: 'left',
                                    border: '2px solid #aaa',
                                }}
                            >
                                {moment(value?.date).format('DD-MM-YYYY HH:MM')}
                            </td>
                            <td
                                style={{
                                    padding: '10px 5px',
                                    height: '25px',
                                    textAlign: 'left',
                                    border: '2px solid #aaa',
                                }}
                            >
                                {value.authorizationId}
                            </td>
                            <td
                                style={{
                                    padding: '10px 5px',
                                    height: '25px',
                                    textAlign: 'left',
                                    border: '2px solid #aaa',
                                }}
                            >
                                {value.label}
                            </td>
                            <td
                                style={{
                                    padding: '10px 5px',
                                    height: '25px',
                                    textAlign: 'left',
                                    border: '2px solid #aaa',
                                }}
                            >
                                {value?.type === 'D'
                                    ? value.transactionAmount
                                    : ''}
                            </td>
                            <td
                                style={{
                                    padding: '10px 5px',
                                    height: '25px',
                                    textAlign: 'left',
                                    border: '2px solid #aaa',
                                }}
                            >
                                {value?.type === 'C'
                                    ? value.transactionAmount
                                    : ''}
                            </td>
                            <td
                                style={{
                                    padding: '10px 5px',
                                    height: '25px',
                                    textAlign: 'left',
                                    border: '2px solid #aaa',
                                }}
                            >
                                {value.balance}
                            </td>
                        </tr>
                    ))}

                    <tr
                        className="bg-gray-200 border-2"
                        style={{ textAlign: 'center' }}
                    >
                        <td colSpan={3} className="border-2 p-2">
                            Total :
                        </td>
                        <td className="border-2 p-2">
                            <div
                                style={{ fontWeight: 'bold' }}
                                className="text-center w-full"
                            >
                                {sumByType('D')}
                            </div>
                        </td>
                        <td className="border-2 p-2">
                            <div
                                style={{ fontWeight: 'bold' }}
                                className="text-center w-full"
                            >
                                {sumByType('C')}
                            </div>
                        </td>

                        <td></td>
                    </tr>
                </tbody>
            </table>

            <div style={{ padding: '20px 0px', marginTop: '10px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <div style={{ textAlign: 'right' }}>
                        <h4 style={{ fontWeight: 'normal' }}>Résumé</h4>
                        <br />

                        <div>
                            <span>Total crédit :</span>
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: '5px',
                                }}
                            >
                                {sumByType('C')}
                            </span>
                        </div>
                        <div>
                            <span>Total débit :</span>
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: '5px',
                                }}
                            >
                                {sumByType('D')}
                            </span>
                        </div>
                        <div style={{}}>
                            <span>Solde final :</span>
                            <span
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    marginLeft: '5px',
                                }}
                            >
                                {account.balance} {account.currency}
                            </span>
                        </div>
                        <div
                            style={{ width: '100%', border: '1px solid #aaa' }}
                        ></div>
                    </div>
                </div>
            </div>

            <br />
        </div>
    )
})
