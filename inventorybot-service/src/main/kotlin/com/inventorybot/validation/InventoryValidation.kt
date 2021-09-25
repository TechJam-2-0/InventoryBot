package com.inventorybot.validation


import javax.inject.Singleton



@Singleton
public class InventoryValidation {

    fun isValidCashFlowType(x: String): Boolean = when {
       //CASH_FLOW_CALCULATION_OBSERVED_CONDTION_TYPE.toLowerCase().equals(x.toLowerCase(),true) -> true
       // CASH_FLOW_CALCULATION_INSPECTION_OUTCOME_TYPE.toLowerCase().equals(x.toLowerCase(),true) -> true
        else -> false
    }
    fun isValidFilterType(x: String): Boolean = when {
       // FILTER_TYPE_COUNT.toLowerCase().equals(x.toLowerCase(),true) -> true
       // FILTER_TYPE__PERCENTAGE.toLowerCase().equals(x.toLowerCase(),true) -> true
        //FILTER_TYPE__NON.toLowerCase().equals(x.toLowerCase(),true) -> true
        else -> false
    }
    fun isPoleConditionFilterType(x: String): Boolean = when {
        //POLE_CONDITION_FILTER_TYPE_ENCOUNTER.toLowerCase().equals(x.toLowerCase(),true) -> true
        //POLE_CONDITION_FILTER_TYPE_POPULATION.toLowerCase().equals(x.toLowerCase(),true) -> true
        else -> false
    }

}
