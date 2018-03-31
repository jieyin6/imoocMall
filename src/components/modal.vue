<template>
    <div class="modal">
        <div class="title-container">
            <slot name="title"></slot>
        </div>
        <div class="btn-container">
            <slot name="btn" ></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99;
    width: 260px;
    height: 160px;
    transform: translate3d(-150px,-100px,0);
    border: 1px solid skyblue;
    padding: 20px;
    background-color: #fff;
    cursor: pointer;
    .title-container{
        height: 60px;
        line-height: 60px;
        margin-bottom: 40px;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
    }
    .btn-container{
        display: flex;
        justify-content: space-around;
    }
}

</style>
