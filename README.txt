This project is a supply-chain business network system – ms2819.supply.chain.network. It provides in-built access control security, tracking of commodities, data immutability, and participant's management system. 

The supply chain is an essential system for businesses involved in supplying products or services to customers. Blockchain enables organizations to digitalize physical assets and create a decentralized record of all transactions, making the data immutable and more transparent for end-to-end tracking in the supply chain.
There are two transactions used in this supply-chain network:
- “Initiate_purchase_order”
A transaction that enables all participants to raise orders for the commodities – to its vendors.
- “Transfer_commodity” 
A transaction used for trading the goods – finalizing the order between participants.

5 actors currently exist in the ms2819.supply.chain.network:
- Retailer
 Businesses created for a specific purpose, involved in selling the merchandise and certain services to customers.
- Distributor
 Business usually created to make products available for the customers or other businesses that need it 
- Manufacturer 
Subject (person or company) usually makes the goods for sale and supplies the goods to the distribution centers.
- Customer 
A subject that usually has the recipient's role for the goods, products, or services in commerce and sales.
- Supplier 
In supply chains of business, suppliers usually have an entity that supplies goods and services for another business/organization.


There are 2 assets that can be transacted between participants in this blockchain system:

1. Commodity
- In commercial businesses, "Commodity" represents basic goods that are interchangeable with other goods of the same type and are usually used as inputs in production.
- relationship with "Purchase_order," as any participant can raise "Purchase_order" to trade commodities.
- relationship with the current owner of the Commodity, to be only available for the owner.
- relationship with the issuer of the Commodity, required for transactions.
- can be traced as it's linked to "Trace" concept system
- Can be transferred from one participant to another via "Transfer_commodity" transaction, only the owner of Commodity can fulfill the transfer.
- After "Transfer_commodity" transaction is successful, the old owner will no longer have access to the traded Commodity as it was transferred to the purchaser, who becomes the new owner. 

2. Purchase_order
- used for ordering system functionality, enables all participants to  create orders including list of commodities the participants want to purchase and the vendor who is going to trade it. 
-relationship with the purchaser (for the person that is ordering)
-relationship with the vendor (for the participant that is selling it)
-Can be only raised for the owners of particular Commodities via "Initiate_purchase_order" transactions(We can't raise purchase order transactions for Commodity to the participant that doesn't own this Commodity).
- After successfully initiated, it will display status "PLACED" so the vendor receives it and can use "Transfer_commodity" transaction to trade the goods.
- this asset is enabled to change its state as its linked to an enumerator data type. (Vendors of the commodities can change the "Purchaste_status" of the asset.


"Commodity" asset has three relationships:
- relationship with "Purchase_order" asset is used for ordering functionality, as any network participants can raise a purchase order and trade commodity.
- relationship with Trader owner of the Commodity – as every Commodity has it's an owner that is the only authorized party to trade his own goods, and only he will be able to submit the "Trade_commodity" to transaction which will be discussed later in order to transfer ownership to another participant.
- relationship with Trader issuer – as the issuer is required to successfully submit "Trade_commodity" transaction that will be discussed later.


The "Purchase_order" asset has several attributes as order_id (primary key),  Commodity[] itemlist – which provides area of multiple commodities that can be traded within the order  and also optional attributes such as "Purchase_status". (this attribute will be discussed below, as its enumerated to grant the asset capability to its state based on the order status), "unit_price" and "total_price" that are referred to pricing of the goods. ( Those values are optional because its not needed to do any financial operations within this project).
The "Purchase_order" asset has two relationships
- relationship with Trader purchaser  - required for the transactions to define who is the orderer.
- relationship with Trader vendor - needed for the transactions to determine who is the good's seller.



There are currently two transactions designed for the supply chain functionality:
- “Initiate_purchase_order”
This can be used via any network participant to raise the order for a specific Commodity.
- “Transfer_commodity”
This can be used via any owner of his own Commodity to trade the goods and grant ownership to the purchaser ( Fulfilling the purchase order).


The "Initiate_purchase_order" transaction has the following attributes:

-  order_id (primary key identifier)
- Commodity[] itemlist (Enables us to purchase multiple commodities within the purchase order)
- order_total_price  (referred to pricing, value is optional because its not needed to do any financial operations within this project).


The "Initiate_purchase_order" transaction has two relationships:

- relationship with Trader purchaser  (Purchase_order asset) - required for the transactions to define who is the orderer
- relationship with Trader vendor (Purchase_order asset) - required for the transactions to define who is the good's seller.

The "Transfer_commodity" transaction has the Address attribute assigned. This enables to track where the Commodity is being transferred from.

The "Transfer_commodity" transaction has four relationships:

- relationship with "Commodity" asset – this is used for mapping with commodity list of the goods we are going to trade.
- relationship with "issuer" – required to submit the transaction as only the owner can transfer the ownership to another participant
- relationship with "new_owner" – required to update the block after the transaction was completed successfully to set the new owner of traded Commodity.
- relationship with "Purchase_order" asset used for ordering functionality, as any of network participants can raise an purchase order and trade commodity.


The "lib/sample.js" script file contains code that defines business logic functions, and the "query.qry" query file defines queries for the ms2819.supply.chain.network.


Query File "queries.qry" contains code defined for querying system in ms2819.supply.chain.network, it is linked to functions in Script File "lib/sample.js" and transactions in model CTO file "models/sample.cto". Using this query system, we can find a particular Commodity, order or display all particular participants of the network.
