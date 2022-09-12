/**
 * This is for "Initiate_purchase_order" transaction from one trader to another
 * @param {org.ms2819.supply.chain.network.Initiate_purchase_order} IniPO - Initiate_purchase_order to be processed
 * @transaction
 */

function Initiate_purchase_order(IniPO) {
    console.log('Start of initiate_purchase_order function');
    var factory = getFactory();   /* factory API will help to create new resources */
    var network = 'org.ms2819.supply.chain.network';

    var current_participant = getCurrentParticipant();

    var order = factory.newResource(network,'Purchase_order', IniPO.order_id);
    order.itemlist = IniPO.itemlist;
    if (IniPO.order_total_price) {
    order.order_total_price = IniPO.order_total_price;
    }

    order.purchase_status = 'PLACED';
    order.purchaser = current_participant;
    order.vendor = IniPO.vendor;


    /* this will be calling the purchase order asset registry*/ 
    /* Directly taking the purchase_order type  inside getAssetRegistry */

    return getAssetRegistry(order.getFullyQualifiedType()).then(function (assetRegistry) {
    
      return assetRegistry.add(order);
    

    });

 }


 /**
 * This is for tracking the trade of a commodity from one trader to another 
 * @param {org.ms2819.supply.chain.network.Transfer_commodity} trade - the Initiate_purchase_order to bne processed
 * @transaction
 */


 function Transfer_commodity(trade) {
     console.log('Start function transfer commodity');
     var network = 'org.ms2819.supply.chain.network';
     var current_participant = getCurrentParticipant();
     var factory = getFactory(); /*using factory to create new Trace for tracking system */


     trade.commodity.issuer = current_participant;
     trade.commodity.owner = trade.new_owner;
     trade.commodity.purchase_order = trade.purchase_order;

     var new_trace = factory.newConcept(network, 'Trace') /*using factory to create new Trace for tracking system */
     new_trace.timestamp = new Date(); /* fetch the current date */
     new_trace.location = trade.shipping_from;   /* Shipper location */
     new_trace.company = current_participant;       
     trade.commodity.trace.push(new_trace);      /* Pushing new tracking if the commodity was traded to new owner */

 
   
   /* promise to get asset registry and update it */

    return getAssetRegistry('org.ms2819.supply.chain.network.Commodity').then(function (assetRegistry) { 
      
        return assetRegistry.update(trade.commodity); /* return promise resolve function to update registry */
    
    });

 }


 /**
 * This is for query_commodity transaction functionality 
 * @param {org.ms2819.supply.chain.network.query_commodity} tx commodity
 * @transaction
 */


	async function query_commodity(qc){
        let qx_commodity = qc.commodity.commodityid;
    	let queryResults = await query('query_commodity', {tID: qx_commodity});
        if(queryResults.length>0){
         queryResults.forEach(item=>console.log(item));
        } else
           throw new Error('No results');
      
    }


 /**
 * This is for query_purchase_order transaction functionality 
 * @param {org.ms2819.supply.chain.network.query_purchase_order} tx purchase_order
 * @transaction
 */


	async function query_purchase_order(qpc){
        let qpx_purchase_order = qpc.purchase_order.order_id;
    	let queryResults = await query('query_purchase_order', {tID: qpx_purchase_order});
        if(queryResults.length>0){
         queryResults.forEach(item=>console.log(item));
        } else
           throw new Error('No results');
      
    }

 /**
 * This is for query_suppliers transaction functionality 
 * @param {org.ms2819.supply.chain.network.query_suppliers} tx query_suppliers
 * @transaction
 */

	async function query_suppliers(){
      	let queryResults = await query('query_suppliers');
        if(queryResults.length>0){
         queryResults.forEach(item=>console.log(item));
        } else
           throw new Error('No results');
      
    }


 /**
 * This is for query_suppliers transaction functionality 
 * @param {org.ms2819.supply.chain.network.query_retailers} tx query_retailers
 * @transaction
 */

	async function query_retailers(){
      	let queryResults = await query('query_retailers');
        if(queryResults.length>0){
         queryResults.forEach(item=>console.log(item));
        } else
           throw new Error('No results');
      
    }

/**
 * This is for query_suppliers transaction functionality 
 * @param {org.ms2819.supply.chain.network.query_manufacturers} tx query_manufactuers
 * @transaction
 */

	async function query_manufactuers(){
      	let queryResults = await query('query_manufacturers');
        if(queryResults.length>0){
         queryResults.forEach(item=>console.log(item));
        } else
           throw new Error('No results');
      
    }
/**
 * This is for query_suppliers transaction functionality 
 * @param {org.ms2819.supply.chain.network.query_customers} tx query_customers
 * @transaction
 */

	async function query_customers(){
      	let queryResults = await query('query_customers');
        if(queryResults.length>0){
         queryResults.forEach(item=>console.log(item));
        } else
           throw new Error('No results');
      
    }

/**
 * This is for query_suppliers transaction functionality 
 * @param {org.ms2819.supply.chain.network.query_distributors} tx query_distributors
 * @transaction
 */

	async function query_distributors(){
      	let queryResults = await query('query_distributors');
        if(queryResults.length>0){
         queryResults.forEach(item=>console.log(item));
        } else
           throw new Error('No results');
      
    }