<template >
    <div>
        <button
            :class="{ primary: primary, secondary: secondary, large: large, rounded: rounded }"
        >{{ nome }}</button>
    </div>
</template>
<script>


export default {
    props: {
        nome: String,
        primary: Boolean,
        large: Boolean,
        rounded: Boolean,
        FunctionToBeCall: String,
        secondary: Boolean
    },
    methods: {
        dispatchFunction(event) {
            console.log(this.FunctionToBeCall)
            return event
        }
    },
}
</script>
<style >
</style>